---
sideEffort: False
tags:
  - tag A
  - tag B
---
# GetUserById

## Query

```sql
SELECT
  `id`,
  `name`
FROM `users`
WHERE `id` = @id;
```

## Schema

### Input

```yaml json-schema
title: Input User Id for GetUserById
type: object
properties:
  id:
    description: User Id
    type: integer
additionalProperties: false
required:
  - id
```

### Output

```yaml json-schema
title: Output User Data for GetUserById
type: object
properties:
  id:
    description: User Id
    type: integer
  id:
    description: User Name
    type: string
additionalProperties: false
required:
  - id
  - name
```
