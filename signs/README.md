# Sign Upload Backend

## Running

```
npm install
npm start # starts the gcloud functions emulator
```

## Setup

```
gsutil mb -l europe-west1 gs://signs.myeu.uk
gsutil cors set cors.json gs://signs.myeu.uk
```
