from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI']='postgresql://postgres:123@localhost/demoDB'
db = SQLAlchemy(app)
#Define db model. Create a table in our demoDB


    #CART--------------------------------------------------------
class Orders(db.Model):
    __tablename__ = 'orders'
    id=db.Column(db.Integer, primary_key=True)
    fName=db.Column(db.String(120))
    lName=db.Column(db.String(120))
    email=db.Column(db.String(120), unique =True)
    total=db.Column(db.Integer)

    def __init__(self, fName, lName, email, total):
        self.fName = fName
        self.lName = lName
        self.email = email
        self.total = total

#homepage when app is ran
@app.route("/")
def contact():
    return render_template("cart.html")

#handle the page when form is submitted
#request methos POST is collecting the data of the form when submit is clicked
@app.route("/", methods=["POST"])
def thankcart():
    if request.method == "POST":
        fName = request.form["f_name"]
        lName = request.form["l_name"]
        email = request.form["email_name"]
        total = request.form["total"]
        print(request.form)
        #LAST STEP: comit
    orders = Orders(fName, lName, email, total)
    db.session.add(orders)
    db.session.commit() #execute the data into database
    return render_template("thankcart.html")



    #CART--------------------------------------------------------
if __name__ =="__main__":
    app.run()
    app.debug=True
