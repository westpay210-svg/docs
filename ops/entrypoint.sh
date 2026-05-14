#!/usr/bin/env sh
set -eu

: "${AWS_REGION:?AWS_REGION is required}"
: "${SECRET_ID:?SECRET_ID is required}"

echo "Fetching secrets from Secrets Manager: $SECRET_ID ($AWS_REGION)"

SECRET_JSON="$(aws secretsmanager get-secret-value \
  --region "$AWS_REGION" \
  --secret-id "$SECRET_ID" \
  --query SecretString \
  --output text)"

# Export each JSON key as env var
# Example secret JSON: {"JWT_SECRET":"...", "DATABASE_URL":"...", "SOME_KEY":"..."}
echo "$SECRET_JSON" | jq -r 'to_entries|.[]|"\(.key)=\(.value|tostring)"' > /tmp/runtime.env

set -a
. /tmp/runtime.env
set +a

# Debug: Print loaded environment variables
echo "Loaded environment variables:"
cat /tmp/runtime.env

# Start Next.js standalone server
exec node server.js