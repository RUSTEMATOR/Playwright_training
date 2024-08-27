FROM mcr.microsoft.com/playwright:v1.46.0-jammy-arm64

RUN mkdir playwright-tests

WORKDIR playwright-tests

COPY . .

RUN npm ci


CMD ["npm",  "run",  "test"]