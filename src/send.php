<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $email = 'pecig55684@notedns.com'; // Замените на ваш электронный адрес
    $subject = 'Новое сообщение с формы';
    $message = '';

    foreach ($_POST as $key => $value) {
        $message .= "$key: $value\n";
    }

    
    $headers = 'From: webmaster@example.com' . "\r\n" .
               'Reply-To: webmaster@example.com' . "\r\n" .
               'X-Mailer: PHP/' . phpversion();

    mail($email, $subject, $message, $headers);
    echo 'Сообщение отправлено';
} else {
    echo 'Ошибка отправки';
}
?>