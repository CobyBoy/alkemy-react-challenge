export interface LoginValues {
  email: string;
  password: string;
}

export interface ComplexMeal {
  resultsRequested: number;
  diet: string;
  ingredients: string;
  query: string;
}

interface IngredientsNutrients {
    amount: number
    name: string
    unit: string
}
interface Ingredients {
    amount: number,
    id: number 
    name: string
    nutrient: Array<IngredientsNutrients>
    unit: number
}

interface Nutrient {
amount: number
name: string
percentOfDailyNeeds: number
unit: string
}
interface Nutrition {
    //caloricBreakdown: {percentProtein: 13.63, percentFat: 28.46, percentCarbs: 57.91}
//flavonoids: (26) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
ingredients: Array<Ingredients>
nutrients: Array<Nutrient>
//properties: (2) [{…}, {…}]
//weightPerServing: {amount: 220, unit: 'g'}
}

interface AnalyzedIntruction {
    name: string
}

export interface Meal {
  aggregateLikes: number;
  analyzedInstructions: Array<AnalyzedIntruction>;
  cheap: boolean;
  creditsText: string;
  cuisines: Array<string>;
  dairyFree: boolean;
  diets: Array<string>;
  dishTypes: Array<string>;
  gaps: string;
  glutenFree: boolean;
  healthScore: number;
  id: number;
  image: string;
  imageType: string;
  license: string;
  lowFodmap: boolean;
  nutrition: Nutrition;
  pricePerServing: number;
  readyInMinutes: number;
  servings: number;
  sourceName: string;
  sourceUrl: string;
  spoonacularScore: number;
  spoonacularSourceUrl: string;
  summary: string;
  sustainable: boolean;
  title: string;
  vegan: boolean;
  vegetarian: boolean;
  veryHealthy: boolean;
  veryPopular: boolean;
  weightWatcherSmartPoints: number;
}

export interface ComplexMealApiResult {
  resultsRequestedAmount: number;
  offset: number;
  results: Array<Meal>;
  totalResuls: number;
}

export interface tokenApiResult {
    token: string
}