<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $highscore = $_POST["highscore"];

    try {
        require_once "database.php";
        $query = "INSERT INTO users (username, highscore) VALUES 
        (?, ?, ?);";

    $stmt = $pdo->prepare($query);

    $stmt->execute([$username, $highscore]);

    $pdo = null;
    $stmt = null;

    header("Location: index.php");

    die();
    } catch (PDOException $e) {
        die("Query failed: " . $e->getMessage());
    }
} else {
    header("Location: index.php");
}
?>