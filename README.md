# Map GitHub Actor

![Continuous Integration](https://github.com/icalia-actions/map-github-actor/actions/workflows/ci-and-cd.yml/badge.svg)
[![Maintainability](https://api.codeclimate.com/v1/badges/24f8e766fa7be69fca13/maintainability)](https://codeclimate.com/github/icalia-actions/map-github-actor/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/24f8e766fa7be69fca13/test_coverage)](https://codeclimate.com/github/icalia-actions/map-github-actor/test_coverage)


This action checks the workflow actor (i.e. the GitHub user that triggered the
action) to any identifier such as Slack ID's, email addresses, etc.

## Usage

On any of your GitHub Actions workflows:

```yaml
name: CI & CD

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build_something:
    runs-on: ubuntu-latest
    steps:
      # Figure out who the GitHub actor is on Slack:
      - name: Map actor to slack
        id: map-actor-to-slack
        uses: icalia-actions/map-github-actor@v0.0.1
        with:
          actor-map: '{"octocat":"U0000000000","otheruser":"U0000000000"}'
          default-mapping: C0000000000 # If the mapping is not found, send to a channel instead

      # Then, say hello on Slack:
      - name: Say hello on Slack
        uses: slackapi/slack-github-action@v1.15.0
        env:
          SLACK_BOT_TOKEN: ${{ secrets.YOUR_SLACK_BOT_TOKEN }}
        with:
          channel-id: ${{ steps.map-actor-to-slack.outputs.actor-mapping }}
          slack-message: Hello ${{ env.GITHUB_ACTOR }}! Mucho gusto!
```

### Inputs

| Name              | Type   | Description                                   |
|-------------------|--------|-----------------------------------------------|
| `actor-map`       | String | A JSON String or the location of a JSON file  |
| `default-mapping` | String | The default mapping if the actor is not found |

### Outputs

| Name              | Type   | Description                                    |
|-------------------|--------|------------------------------------------------|
| `actor-mapping`   | String | The matched mapping corresponding to the actor |
