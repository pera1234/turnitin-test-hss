<?php
header('Content-Type: application/json');
$pathInfo = explode('/', $_SERVER['PATH_INFO']);
if (count($pathInfo) < 2) {
    echo json_encode([
        'error' => 'Invalid path'
    ]);
    exit;
}
$dbconn = pg_connect("host=db dbname=postgres user=postgres password=postgres");

$resource = $pathInfo[1];
switch ($resource) {
    case 'members':
        $result = pg_query_params($dbconn,
            'SELECT
                        m.id AS membership_id,
                        m.user_id,
                        m.role,
                        u.id AS user_id,
                        u.name,
                        u.email
                    FROM memberships m
                    INNER JOIN users u
                    ON m.user_id = u.id', []);
        $memberships = [];
        while($membership = pg_fetch_assoc($result)) {
            $memberships[] = [
                'id' => $membership['membership_id'],
                'user_id' => $membership['user_id'],
                'role' => $membership['role'],
                'user' => [
                    'id' => $membership['user_id'],
                    'name' => $membership['name'],
                    'email' => $membership['email']
                ]
            ];
        }

        echo json_encode([
            'memberships' => $memberships
        ]);
        break;
    case 'users':
        if (isset($pathInfo[2])) {
            $userId = $pathInfo[2];
            $result = pg_query_params($dbconn, 'SELECT * FROM users WHERE id = $1', [$userId]);
            $user = pg_fetch_assoc($result);
            echo json_encode($user);
        } else {
            $result = pg_query_params($dbconn, 'SELECT * FROM users', []);
            $users = [];
            while($user = pg_fetch_assoc($result)) {
                $users[] = $user;
            }
            echo json_encode([
                'users' => $users
            ]);
        }
        break;
    default:
        echo json_encode([
            'error' => 'Invalid resource'
        ]);
        break;
}
?>