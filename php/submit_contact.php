<?php
header('Content-Type: application/json');

// Database configuration
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "keerthi_portfolio";

try {
    $conn = new mysqli($host, $user, $pass, $dbname);
    if ($conn->connect_error) {
        throw new Exception("DB connection failed: " . $conn->connect_error);
    }

    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $name = isset($_POST['name']) ? trim($_POST['name']) : '';
        $email = isset($_POST['email']) ? trim($_POST['email']) : '';
        $phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
        $message = isset($_POST['message']) ? trim($_POST['message']) : '';

        // Validate required fields
        if (empty($name) || empty($email) || empty($message)) {
            echo json_encode(["status" => "error", "message" => "Name, email, and message are required."]);
            exit;
        }

        // Prepare and bind
        $stmt = $conn->prepare("INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $name, $email, $phone, $message);

       if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Thank you for filling the form, we will get back to you soon"]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to save message: " . $conn->error]);
}

        $stmt->close();
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid request method."]);
    }
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}

$conn->close();
?>