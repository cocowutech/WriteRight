CREATE TABLE papers (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    paper_content TEXT NOT NULL,
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
)