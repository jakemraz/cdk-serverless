import flask
import uuid

app = flask.Flask(__name__) 
id = str(uuid.uuid4())

@app.route("/", methods=['GET']) 
def get_index():
	ans = f'BAR GET / {id}'
	return ans

@app.route("/", methods=['POST']) 
def post_index():
	ans = f'BAR POST / {id}'
	return ans

@app.route("/hello", methods=['GET', 'POST'])
def all_hello():
	ans = f'BAR {flask.request.method} /hello {id}'
	return ans

if __name__ == "__main__": 
	app.run(debug=True, host="0.0.0.0", port=4000)
