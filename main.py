from fastapi import FastAPI
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql://user:password@postgres:5432/database"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}


@app.get('/api/questions')
async def get_questions():
    # Return questions as a JSON object
    return questions

questions =[
    {
        'id': 1,
        'questionText': "What's 1+1?",
        'answers': {
            'A': '2',
            'B': '3',
            'C': '4',
            'D': '5',
        },
        'correctAnswer': 'A',
        'explanation': "It's 2 because 1+1=2.",
    },
    {
        'id': 2,
        'questionText': "What's the capital of France?",
        'answers': {
            'A': 'Paris', 
            'B': 'Berlin',
            'C': 'London',
            'D': 'Rome',
        },
        'correctAnswer': 'A',
        'explanation': "Paris is the capital of France.",
    },
    {
        'id': 3,
        'questionText': 'What is the largest ocean in the world?',
        'answers': {
            'A': 'Atlantic Ocean',
            'B': 'Indian Ocean',
            'C': 'Arctic Ocean',
            'D': 'Pacific Ocean',
        },
        'correctAnswer': 'D',
        'explanation': "The Pacific Ocean is the largest ocean in the world.",
    },
]

print('test')
