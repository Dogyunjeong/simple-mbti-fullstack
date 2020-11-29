# Simple MBTI test app

Using react/ts, node/ts and maria db

Total spending hours is around 7 
- around 1hr: Tested mbti result calculation with `./server/csvTest.ts` first.
- around 4hrs: Implemented backend and frontend
- rest of times, some more than 2hrs: set up mariadb and dockerize.
  - I am fully expert in docker. So it tooks some time

## How to run

- `$ cd deploy/dev & docker-compose up -d`
- **IMPORTANT** Once, mbtidb service is started, Please import `Questions.csv` into `questions table`
- access to `localhost:4000`

## Stack
- react with Typescript
- nodejs with typescript
- mariadb

## Ignored points

- FRONT
  - No loading indicators
  - No success and failed indicator
- FRONT/BACKEND
  - No validation to build fast.
  - Not much concern to user url dynamic parameters.
- BACKEND
  -Should take care transaction when insert multiple values. But now not care this concern.
- DB
  -There should be questionaire table which is holding questions.
- DEPLOY
  - not care production deploying
  - woudl have been nice if automatically import `Questions.csv` into `questions` db
