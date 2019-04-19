from flask import Flask
from flask_restful import Api, Resource, reqparse
from redis import redis

app = Flask(__name__)
api = Api(app)

r = redis.Redis(host='localhost', port=6379, db=0)

users = [
    {
        "name": "Nicholas",
        "age": 42,
        "occupation": "Network Engineer",
    },
    {
        "name": "Elvin",
        "age": 32,
        "occupation": "Doctor",
    },
    {
        "name": "Jass",
        "age": 22,
        "occupation": "Web developer",
    },
]

status = "// TODO add welcome message"

class User(Resource):

    def get(self, name):
        for user in users:
            if(name == user["name"]):
                return user, 200
        return "User not found", 404

    def post(self, name):
        parser = reqparse.RequestParser()
        parser.add_argument("age")
        parser.add_argument("occupation")
        args = parser.parse_args()

        for user in users:
            if(name == user["name"]):
                return "User with name {} already exists".format(name), 400

        user = {
            "name": name,
            "age": args["age"],
            "occupation": args["occupation"],
        }

        users.append(user)
        return user, 201

    def put(self, name):
        parser = reqparse.RequestParser()
        parser.add_argument("age")
        parser.add_argument("occupation")
        args = parser.parse_args()

        for user in users:
            if(name == user["name"]):
                user["age"] = args["age"]
                user["occupation"] = args["occupation"]
                return user, 200
        
        user = {
            "name": name,
            "age": args["age"],
            "occupation": args["occupation"],
        }

        users.append(user)
        return user, 201

    def delete(self, name):
        global users
        users = [user for user in users if user["name"] != name]
        return "{} is deleted.".format(name), 200

api.add_resource(User, "/user/<string:name>")

class Status(Resource):

    def get(self):
        return status, 200

    def put(self, newStatus):
        status = newStatus
        return status, 201

api.add_resource(Status, "/status", "/status/<string:newStatus>")

class Landing(Resource):
    def get(self):
        return "Welcome to the dashboard API", 200

api.add_resource(Landing, "/")

app.run(debug=True, host="0.0.0.0")
