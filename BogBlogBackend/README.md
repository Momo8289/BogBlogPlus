# BogBlugBackend
To run locally:
```bash
git clone https://github.com/Momo8289/BogBlogPlus.git
cd BogBlogPlus/BogBlogBackend

# Only on first setup
python -m venv venv
# Linux:
source venv/bin/activate
# Windows:
.\venv\Scripts\activate

pip install -r requirements.txt

flask db init
flask db migrate
flask db upgrade

# To run
flask run
```