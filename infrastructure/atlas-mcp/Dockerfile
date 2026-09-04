FROM python:3.13.7-slim-bookworm@sha256:adafcc17694d715c905b4c7bebd96907a1fd5cf183395f0ebc4d3428bd22d92d AS test

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONPATH=/app/src

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir --requirement requirements.txt

COPY src/ src/
COPY tests/ tests/
COPY compose.windows.yaml .
RUN python -m unittest discover --start-directory tests --verbose

FROM python:3.13.7-slim-bookworm@sha256:adafcc17694d715c905b4c7bebd96907a1fd5cf183395f0ebc4d3428bd22d92d AS runtime

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONPATH=/app/src

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir --requirement requirements.txt \
    && useradd --create-home --uid 10001 --shell /usr/sbin/nologin atlas-mcp \
    && mkdir /audit \
    && chown atlas-mcp:atlas-mcp /audit \
    && chmod 0700 /audit

COPY --from=test --chown=atlas-mcp:atlas-mcp /app/src/ /app/src/

USER 10001:10001

ENTRYPOINT ["python", "-m", "atlas_mcp"]
