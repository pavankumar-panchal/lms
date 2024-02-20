<?php

// Import PHPMailer classes into the global namespace 
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Include library files 
require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

include('functions/phpfunctions.php');

$array = array();
$date = datetimelocal('d-m-Y');
$array[] = "##DATE##%^%" . $date;
$array[] = "##COMPANYNAME##%^%" . 'Relyon Softech Ltd';

// Create an instance; Pass `true` to enable exceptions 
$mail = new PHPMailer;

// Set email format to HTML 
$mail->isHTML(true);

// SMTP configuration 
$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth = true;
$mail->Username = 'panchalpavan111@gmail.com'; // Your Gmail address
$mail->Password = 'ukzygvcaoweqvcgz'; // Your Gmail app password
$mail->SMTPSecure = 'ssl';   
$mail->Port = 465;

// Sender info 
$mail->setFrom('panchalpavan111@gmail.com', 'Relyon');
$mail->addReplyTo('panchalpavan800@gmail.com', 'Info');

// Add a recipient 
$mail->addAddress('panchalpavan800@gmail.com', 'kumar');

// Load HTML template
$message = file_get_contents('mailinvoice/send_quote.html');

// Add simple text
// $text = "Hello,\n\nThis is a simple text message.\n\n";
// $message = $text . $message;

$mail->Subject = 'Email from Relyon';
$mail->Body = $message;

// Send email
if (!$mail->send()) {
    echo 'Message could not be sent. Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message has been sent.';
}

?>
