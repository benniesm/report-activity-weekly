<?php
namespace Src\TableGateways;

class WorkdoneGateway {

    private $db = null;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function findAll()
    {
        $statement = "
            SELECT
                id, lock_id, activity, achievement, time_in, comments, reviews, review_time
            FROM
                workdone;
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
                id, lock_id, activity, achievement, time_in, comments, reviews, review_time
            FROM
                workdone
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
            INSERT INTO workdone
                (lock_id, activity, achievement, comments)
            VALUES
                (:lock_id, :activity, :achievement, :comments);
        ";

        try {
            $statement = $this->db->prepare($statement);
            $statement->execute(array(
                'lock_id' => $input['lock_id'],
                'activity'  => $input['activity'],
                'achievement'  => $input['achievement'],
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
            UPDATE workdone
            SET
                lock_id = :lock_id,
                activity  = :activity,
                achievement = :achievement,
                comments = :comments,
                reviews = :reviews
            WHERE id = :id;
        ";

        try {
            $statement = $this->db->prepare($statement);
            $statement->execute(array(
                'id' => (int) $id,
                'lock_id' => $input['lock_id'],
                'activity'  => $input['activity'],
                'achievement' => $input['achievement'],
                'comments' => $input['comments'] ?? null,
                'reviews' => $input['reviews'] ?? null
            ));
            return $statement->rowCount();
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }
    }

    public function delete($id)
    {
        $statement = "
            DELETE FROM workdone
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
