<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $userSearch = $_POST["usersearch"];
  

    try {
        require_once "database.php";
        $query = "SELECT * FROM highscore WHERE username = :usersearch;";

    $stmt = $pdo->prepare($query);
    
    $stmt->bindParam(":usersearch", $userSearch);
    
    $stmt->execute();

$results = $stmt->fetchAll(PDO:.FETCH_ASSOC);

    $pdo = null;
    $stmt = null;

    header("Location: testformel.php");

    die();
    } catch (PDOException $e) {
        die("Query failed: " . $e->getMessage());
    }
} else {
    header("Location: testformel.php");
}
?>
<!DOCTYPE html>
<html lang?="eng">
 
    <body>
    <h3>Search Result</h3>
        <?php
        if (empty($results)) {
            echo "<div>";
            echo "<p>there were no results</p>";
            echo "</div>";


        } else {
            var_dump($results);
        }
        ?>


</body>
</html>