FROM python:3.13.7-slim-bookworm

WORKDIR /spike

COPY requirements.txt .
RUN pip install --no-cache-dir --requirement requirements.txt

COPY spike_server.py .

RUN useradd --create-home --uid 10001 atlas-mcp-spike
USER atlas-mcp-spike

ENTRYPOINT ["python", "/spike/spike_server.py"]
