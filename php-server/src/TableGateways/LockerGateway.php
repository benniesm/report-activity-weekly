<?php
namespace Src\TableGateways;

class LockerGateway {

    private $db = null;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function findAll()
    {
        $statement = "
            SELECT
                id, token, date, in_time, out_time, lat, lon, comments
            FROM
                locker;
        ";

        try {
            $statement = $this->db->query($statement);
            $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }
    }

    public function find($id)
    {
        $statement = "
            SELECT
                id, token, date, in_time, out_time, lat, lon, comments
            FROM
                locker
            WHERE id = ?;
        ";

        try {
            $statement = $this->db->prepare($statement);
            $statement->execute(array($id));
            $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }
    }

    public function insert(Array $input)
    {
        $statement = "
            INSERT INTO locker
                (token, date, out_time, lat, lon, comments)
            VALUES
                (:token, :date, :out_time, :lat, :lon, :comments);
        ";

        try {
            $statement = $this->db->prepare($statement);
            $statement->execute(array(
                'token' => 'token',
                'date'  => '2020-08-18',
                'lat'  => $input['lat'],
                'lon' => $input['lon'],
                'comments' => $input['comments'] ?? null,
            ));
            return $statement->rowCount();
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }
    }

    public function update($id, Array $input)
    {
        $statement = "
            UPDATE locker
            SET
                token = :token,
                date  = :date,
                out_time  = :out_time,
                lat = :lat,
                lon = :lon,
                comments = :comments
            WHERE id = :id;
        ";

        try {
            $statement = $this->db->prepare($statement);
            $statement->execute(array(
                'id' => (int) $id,
                'token' => $input['token'],
                //'date'  => $input['date'],
                'out_time' => $input['out_time'],
                'lat' => $input['lat'],
                'lon' => $input['lon'],
                'comments' => $input['comments'] ?? null,
            ));
            return $statement->rowCount();
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }
    }

    public function delete($id)
    {
        $statement = "
            DELETE FROM locker
            WHERE id = :id;
        ";

        try {
            $statement = $this->db->prepare($statement);
            $statement->execute(array('id' => $id));
            return $statement->rowCount();
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }
    }
}
