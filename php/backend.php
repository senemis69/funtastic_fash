<?php
include 'db.php';

if (isset($_GET['action']) && $_GET['action'] === 'getProducts') {
    $sql = "SELECT * FROM products";
    $result = $conn->query($sql);

    $products = [];
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $products[] = $row;
        }
    }

    echo json_encode(['products' => $products]);
    $conn->close();
}
?>
