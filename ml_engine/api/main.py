from fastapi import FastAPI

app = FastAPI(title="Dynamic Pricing Engine ML API", version="1.0.0")

@app.get("/")
def read_root():
    return {"message": "Welcome to the Dynamic Pricing Engine ML Service"}

@app.get("/health")
def health_check():
    return {"status": "ok"}
