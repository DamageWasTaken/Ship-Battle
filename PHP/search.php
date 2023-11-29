<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $highscore = $_POST["highscore"];

    try {
        require_once "database.php";
        $query = "INSERT INTO users (username, highscore) VALUES 
        (:username, :highscore);";

    $stmt = $pdo->prepare($query);
    
    $stmt->bindParam(":username", $username);
    $stmt->bindParam(":highscore", $highscore);
    
        

    $stmt->execute();

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
