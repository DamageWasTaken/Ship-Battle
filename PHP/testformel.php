<!DOCTYPE html>
<html lang?="eng">

    <body>
        <form id="inputField" action="insert.php" method="post">
            <label for="name">Navn:</label>
            <input id="name" type="text" name="username" placeholder="Navn">
            <label for="score">Din Score:</label>
            <input id="score" type="text" name="highscore" placeholder="Score">
            <button>Submit</button>
        </form>

        <form action="search.php" method="post">
            <label for="search">Search For User Score</label>
            <input type="text" name="usersearch" id="search" placeholder="Search...">
            <button>Search</button>

        </form>
    </body>
</html>