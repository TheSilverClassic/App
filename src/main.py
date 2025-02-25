from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
from datetime import datetime
from typing import Optional
from typing import List
import asyncpg
import os

# Load variables from .env
load_dotenv()

db_url = os.getenv("DATABASE_URL")  # EXACTLY "DATABASE_URL"

app = FastAPI()

# ------------------------------------------------
# Enable CORS to allow requests from your React app
# ------------------------------------------------
origins = [
    "http://localhost:3000",  # React development server
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allow only the specified origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------------------------------
# Pydantic Model for Character Input
# ------------------------------------------------
class Character(BaseModel):
    owner: str
    name: str
    char_class: str = None  # This maps to the 'p_class' parameter in the function
    level: int = 1
    charisma: int = 0
    constitution: int = 0
    dexterity: int = 0
    intelligence: int = 0
    strength: int = 0
    wisdom: int = 0
    health: int = 10
    max_health: int = 10
    initiative: int = 0

# ----------------------------------------------
# Model for output (includes timestamps)
# ----------------------------------------------
class CharacterOut(BaseModel):
    id: int
    owner: Optional[str]
    name: str
    char_class: Optional[str] = None
    level: int
    charisma: int
    constitution: int
    dexterity: int
    intelligence: int
    strength: int
    wisdom: int
    health: int
    max_health: int
    initiative: int
    created_at: datetime
    updated_at: datetime

# ------------------------------------------------
# Database Connection Pool Setup
# ------------------------------------------------
@app.on_event("startup")
async def startup():
    """
    Initialize the database connection pool at startup.
    We read the DSN from the .env file via DATABASE_URL.
    """
    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        raise ValueError("DATABASE_URL is not set in the environment variables.")

    app.state.pool = await asyncpg.create_pool(dsn=database_url)

@app.on_event("shutdown")
async def shutdown():
    """
    Close the database connection pool on shutdown.
    """
    await app.state.pool.close()

# ------------------------------------------------
# API Endpoint: Create a New Character
# ------------------------------------------------
@app.post("/characters", response_model=dict)
async def create_character(character: Character):
    """
    This endpoint calls the dnd.create_character function.
    It passes the character data as parameters and returns the new character id.
    """
    async with app.state.pool.acquire() as conn:
        try:
            # Call the dnd.create_character function with the required parameters.
            new_id = await conn.fetchval("""
                SELECT dnd.create_character(
                    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13
                )
            """,
                character.owner,
                character.name,
                character.char_class,
                character.level,
                character.charisma,
                character.constitution,
                character.dexterity,
                character.intelligence,
                character.strength,
                character.wisdom,
                character.health,
                character.max_health,
                character.initiative
            )
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    return {"id": new_id}

# New GET endpoint to fetch all characters
@app.get("/characters", response_model=List[CharacterOut])
async def get_characters():
    async with app.state.pool.acquire() as conn:
        try:
            rows = await conn.fetch("SELECT * FROM dnd.characters")
            # Convert each record to a dict
            return [dict(row) for row in rows]
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
