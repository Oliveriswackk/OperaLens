import json
import os

import httpx

AWS_REGION    = os.getenv("AWS_DEFAULT_REGION", "us-east-1")
MODEL_HAIKU   = "anthropic.claude-3-haiku-20240307-v1:0"
MODEL_SONNET  = "anthropic.claude-3-5-sonnet-20241022-v2:0"
BEDROCK_ENDPOINT = f"https://bedrock-runtime.{AWS_REGION}.amazonaws.com"
OLLAMA_HOST   = os.getenv("OLLAMA_HOST", "http://localhost:11434")
OLLAMA_MODEL  = "mistral"
TIMEOUT       = 60


def call_llm(prompt: str, max_tokens: int = 500, temperature: float = 0.3, model: str = MODEL_HAIKU) -> tuple[str, str]:
    """
    Intenta los backends en orden de prioridad.
    Devuelve (texto, fuente) donde fuente es 'bedrock' | 'ollama'.
    Lanza RuntimeError si todos los backends fallan.
    """
    bearer = os.getenv("AWS_BEARER_TOKEN_BEDROCK")
    if bearer:
        try:
            return _bedrock_bearer(prompt, bearer, max_tokens, temperature, model), "bedrock"
        except Exception:
            pass

    if os.getenv("AWS_ACCESS_KEY_ID") and os.getenv("AWS_SECRET_ACCESS_KEY"):
        try:
            return _bedrock_boto3(prompt, max_tokens, temperature, model), "bedrock"
        except Exception:
            pass

    try:
        return _ollama(prompt, max_tokens, temperature), "ollama"
    except Exception:
        pass

    raise RuntimeError("No AI backend available (Bedrock ni Ollama respondieron)")


def _bedrock_bearer(prompt: str, token: str, max_tokens: int, temperature: float, model: str) -> str:
    url = f"{BEDROCK_ENDPOINT}/model/{model}/invoke"
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
    body = {
        "anthropic_version": "bedrock-2023-05-31",
        "max_tokens": max_tokens,
        "temperature": temperature,
        "messages": [{"role": "user", "content": prompt}],
    }
    with httpx.Client(timeout=TIMEOUT) as client:
        r = client.post(url, headers=headers, json=body)
        r.raise_for_status()
    return r.json()["content"][0]["text"].strip()


def _bedrock_boto3(prompt: str, max_tokens: int, temperature: float, model: str) -> str:
    import boto3

    client = boto3.client("bedrock-runtime", region_name=AWS_REGION)
    body = json.dumps({
        "anthropic_version": "bedrock-2023-05-31",
        "max_tokens": max_tokens,
        "temperature": temperature,
        "messages": [{"role": "user", "content": prompt}],
    })
    response = client.invoke_model(modelId=model, body=body)
    return json.loads(response["body"].read())["content"][0]["text"].strip()


def _ollama(prompt: str, max_tokens: int, temperature: float) -> str:
    url = f"{OLLAMA_HOST}/api/generate"
    payload = {
        "model": OLLAMA_MODEL,
        "prompt": prompt,
        "stream": False,
        "options": {"temperature": temperature, "num_predict": max_tokens},
    }
    with httpx.Client(timeout=TIMEOUT) as client:
        r = client.post(url, json=payload)
        r.raise_for_status()
    return r.json()["response"].strip()
