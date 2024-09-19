<?php

session_start();

if (!isset($_POST['csrf_token']) || !isset($_SESSION['csrf_token'])) {
    echo "invalid";
    exit();
}
if ($_POST['csrf_token'] === $_SESSION['csrf_token']) {
    echo "valid";
} else {
    echo "invalid";
}

?>
