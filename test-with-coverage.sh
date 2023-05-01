#!/usr/bin/env bash
set -e

COVERAGE_LOCATION=cov_profile

rm -rf ./$COVERAGE_LOCATION
deno test --coverage=$COVERAGE_LOCATION
deno coverage $COVERAGE_LOCATION --lcov --output=$COVERAGE_LOCATION.lcov
genhtml --rc genhtml_branch_coverage=1 -o $COVERAGE_LOCATION/html $COVERAGE_LOCATION.lcov

echo "Coverage has been generated"
echo
echo "On a mac, run 'open ${COVERAGE_LOCATION}/html/index.html'"
