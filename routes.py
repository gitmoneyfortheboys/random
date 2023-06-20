from fastapi import APIRouter
from .models import Item

router = APIRouter()

@router.post("/items/", response_model=Item)
def create_item(item: Item):
    return item

@router.get("/items/{item_id}", response_model=Item)
def read_item(item_id: int):
    return {"item_id": item_id, "name": "Foo", "description": "A very nice Item", "price": 42.0, "tax": 3.2}
