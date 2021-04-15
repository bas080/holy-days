#!/usr/bin/env bash

source bash-tap

plan 7

DOMAIN_NAME="${DOMAIN_NAME:-http://localhost:3000}"
RANDOM_DAYS="$RANDOM"

redirects_to() {
curl -w "%{url_effective}\n" -I -L -s -S "$1" -o /dev/null
}

test "$(redirects_to "$DOMAIN_NAME")" = "$DOMAIN_NAME/days/"
success "Index redirects to days"

seq 1 3 | while read -r increment; do
  page="$(date -I -d "now+$(($RANDOM_DAYS * $increment))days")"
  url="$DOMAIN_NAME/days/$page"
  url_with_qs="$DOMAIN_NAME/days?date=$page"
  curl -s "$url" | html-validate --stdin | diagnostics
  success "Page %s is valid" "$url"
  test "$(redirects_to "$url_with_qs")" = "$DOMAIN_NAME/days/$page"
  success 'Query url %s redirects correctly' "$url_with_qs"
done
