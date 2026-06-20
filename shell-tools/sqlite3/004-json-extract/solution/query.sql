SELECT json_extract(payload, '$.type'), json_extract(payload, '$.account_id') FROM events WHERE json_extract(payload, '$.account_id') IS NOT NULL ORDER BY id;
