from typing import Union

from fastapi import FastAPI, Request

from fastapi.openapi.utils import get_openapi

import yaml

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/apispec/")
def read_api_spec(format: str = "json"):
    def generate_swagger():
        print(app.routes)
        return get_openapi(title="FastAPI", version="1.0.0", routes=app.routes)

    print(generate_swagger())
    if format == "json":
        return generate_swagger()
    elif format == "yaml":

        return yaml.dump(generate_swagger())
    else:
        return "Invalid format"


# @app.put("/apispec/")
# async def update_api_spec(request: Request, format: str = "json"):
#     # if isinstance(spec, str):
#     #     spec = yaml.load(spec, Loader=yaml.FullLoader)
#     # app.openapi_schema = spec
#     # return app.openapi_schema
