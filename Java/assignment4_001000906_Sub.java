
import java.util.Scanner;
public class assignment4_001000906_Sub{
  public static void main(String[] args){
    String recipeName ="";
    String ingredientName = "";
    ArrayList<Ingredient> recipeList = new ArrayList<Ingredient>();
    Scanner in = new Scanner(System.in);
    while (recipeName.equals("none") == false){
      System.out.print("Input recipe name ('none' to stop): ");
      recipeName = in.nextLine();
      while (ingredientName.equals("none") == false){
        System.out.print("Input ingredient name ('none' to stop): ");
        ingredientName = in.nextLine();
        System.out.print("Input the ingredient amount: ");
        int amount = in.nextInt();
        System.out.print("Input the ingredient unit: ");
        String unit = in.nextLine();
        Ingredient 
      }
    }    
  }
}