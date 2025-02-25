from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import asyncpg

app = FastAPI()

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

# ------------------------------------------------
# Database Connection Pool Setup
# ------------------------------------------------
@app.on_event("startup")
async def startup():
    """
    Initialize the database connection pool at startup.
    Make sure to replace 'your_password_here' with your real password.
    """
    app.state.pool = await asyncpg.create_pool(
        dsn="postgresql://Admin_Narciso:Lalo0811!@10.0.0.107:5433/postgres"
    )

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
