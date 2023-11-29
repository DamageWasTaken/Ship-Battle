
<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $userSearch = $_POST["usersearch"];
  

    try {
        require_once "database.php";
        $query = "SELECT * FROM users";

    $stmt = $pdo->prepare($query);
    

    
    $stmt->execute();

    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $pdo = null;
    $stmt = null;

    

  
    } catch (PDOException $e) {
        die("Query failed: " . $e->getMessage());
    }
} else {
    header("Location: testformel.php");
}
?>
<!DOCTYPE html>
<html lang?="eng">
    <head>
    <script src="test.js"></script>        
    </head>
    <body>
    <h3>Search Result</h3>
        <?php
        if (empty($results)) {
            echo "<div>";
            echo "<p>there were no results</p>";
            echo "</div>";


        } else {

            foreach ($results as $row)
            echo $row["username"];
            echo "<p></p>";
            echo $row["highscore"];
        }
        
        ?>     
    <script>
        var highscore = "<?php echo $row["highscore"];?>";
        var username = "<?php echo $row["username"];?>";
        var DUMP = "<?php echo VAR_DUMP($results);?>":
    </script>  
</body>
</html>