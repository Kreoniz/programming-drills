SELECT customers.email, SUM(orders.cents) AS total_cents FROM customers JOIN orders ON orders.customer_id = customers.id GROUP BY customers.id, customers.email ORDER BY total_cents DESC;
