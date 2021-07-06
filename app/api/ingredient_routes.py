from flask import Blueprint, request
from app.models import Ingredient, Recipe_Ingredient

ingredient_routes = Blueprint('ingredients', __name__)


@ingredient_routes.route('/')
def get_ingredients():
    ingredients = Ingredient.query.all()
    return {"ingredients": [ingredient.to_dict() for ingredient in ingredients]}


@ingredient_routes.route('/delete', methods=['DELETE'])
def delete_recipe_ingredient():
    print(request.get_json(), 'eieieieieieieieieieieieieiieieieieieieieieie')
    r = request.get_json()
    recipe_ingredient_to_delete = Recipe_Ingredient.query.filter_by(ingredient_id=r['ingredient_id'], recipe_id=r['recipe_id']).first()
    print('This will be deleted', recipe_ingredient_to_delete)
    return request.get_json()
