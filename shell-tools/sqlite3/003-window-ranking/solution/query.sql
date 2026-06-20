SELECT RANK() OVER (ORDER BY qty * unit_cents DESC) AS rank, product, qty * unit_cents AS revenue FROM sales ORDER BY rank, product;
