
# Multi-Employer Import Specification (Version 8.0)

## 1. Purpose

This document defines the required structure, field definitions, validation rules, and processing logic for the Multi-Employer Import file used by ADP Health Compliance.

All files submitted for import MUST conform exactly to this specification.


---

## 2. When This File Is Required

A Multi-Employer import file is required when:

- Employees are covered under one or more collective bargaining agreements, AND
- Multi-employer status changes are not reported on the HR Import file.

If multi-employer status is reported on the HR Import file, a separate Multi-Employer file is NOT required.

Multi-employer status MUST NOT be reported on the Benefits Import file.

---

## 3. File Transmission

Files MUST be transmitted using the secure file transfer method approved by ADP.

The COID (Organization ID) and Netsecure ID used in the filename MUST match the identifiers assigned by ADP.

---

## 4. File Naming Convention

### 4.1 Test Files
<code>TEST_COID_NETSECUREID_MULTIER_YYYYMMDD_HHMMSS.TXT</code>


### 4.2 Production Files
<code>COID_NETSECUREID_MULTIER_YYYYMMDD_HHMMSS.TXT</code>


The COID value in the filename MUST match the COID provided in the HEAD record.

---

## 5. File Format Requirements

| Attribute | Requirement |
|------------|-------------|
| Delimiter | Pipe (`|`) |
| Text Qualifier | None |
| Encoding | UTF-8 |
| Record Terminator | LF or CRLF |
| File Structure | Structured by Record Type |

---

## 6. Record Structure

### 6.1 Supported Record Types

| Record Type | Description | Position Requirement |
|-------------|-------------|----------------------|
| HEAD | File header | MUST be first record |
| EEID | Employee identifier | MUST precede associated STAT records |
| STAT | Multi-employer status | One or more per employee |
| FOOT | File footer | MUST be last record |

Files containing unsupported record types will be rejected.

---

## 7. Record Ordering Rules

Records MUST:

1. Be grouped by employee.
2. Follow this sequence per employee:
   - EEID
   - STAT (one or more)
3. Have STAT records sorted by Status Effective Date in ascending order (oldest first).

Files violating sort or grouping rules MUST be rejected.

---

## 8. Field Definitions

### 8.1 HEAD Record

| Seq | Field Name | Required | Format | Validation Rule |
|-----|------------|----------|--------|-----------------|
| 1 | Record Type | YES | `HEAD` | MUST equal `HEAD` |
| 2 | COID | YES | 16-character string | MUST match filename COID |
| 3 | Source Information | YES | Up to 250 characters | No structural validation |

---

### 8.2 EEID Record

| Seq | Field Name | Required | Format | Validation Rule |
|-----|------------|----------|--------|-----------------|
| 1 | Record Type | YES | `EEID` | MUST equal `EEID` |
| 2 | Employee SSN | YES | `XXXXXXXXX` or `XXX-XX-XXXX` | MUST match SSN on HR system |
| 3 | First Name | YES | String (≤ 50 chars) | MUST NOT be blank |
| 4 | Middle Name | YES | String (≤ 50 chars) | None |
| 5 | Last Name | YES | String (≤ 50 chars) | MUST NOT be blank |

---

### 8.3 STAT Record

| Seq | Field Name | Required | Format | Validation Rule |
|-----|------------|----------|--------|-----------------|
| 1 | Record Type | YES | `STAT` | MUST equal `STAT` |
| 2 | Employee SSN | YES | Same format as EEID | MUST match preceding EEID SSN |
| 3 | Multi-Employer Status | YES | `Y` or `N` | Reject if any other value |
| 4 | Status Effective Date | YES | `MM/DD/CCYY` | MUST be valid calendar date |

---

### 8.4 FOOT Record

| Seq | Field Name | Required | Format | Validation Rule |
|-----|------------|----------|--------|-----------------|
| 1 | Record Type | YES | `FOOT` | MUST equal `FOOT` |
| 2 | EEID Record Count | MAY | Integer | SHOULD equal number of unique EEID records |

---

## 9. Status Effective Date Rules

### 9.1 When Status = `Y`

- Status Effective Date MUST represent the first date the employee is part of a multi-employer arrangement.
- If the actual start date is unknown, the Plan Year Start Date MAY be used.

### 9.2 When Status = `N`

- Status Effective Date MUST represent the first date the employee is not part of a multi-employer arrangement.
- For employment terminations, this date MUST be the first date the individual is no longer employed.

---

## 10. Processing Behavior

- An employee’s multi-employer status carries forward until explicitly changed by a subsequent STAT record.
- If no terminating `N` record is provided, the employee is considered active in a multi-employer arrangement.
- The system does not infer termination based solely on absence of future records.

---

## 11. Validation Rules

A file MUST be rejected if any of the following occur:

- HEAD record is missing or not first.
- FOOT record is missing or not last.
- Record Type values are invalid.
- Required fields are blank.
- STAT records are not sorted in ascending effective date order.
- SSN on STAT does not match the associated EEID record.
- Date format is invalid.
- Delimiter is not pipe (`|`).

The system does not auto-correct invalid data.

---

## 12. Example File
```text
HEAD|MYCOID7890123456|PeopleSoft Export
EEID|111111111|JOHN|N|SMITH
STAT|111111111|Y|01/01/2021
EEID|111111112|ZACHARY||WISE
STAT|111111112|N|06/15/2021
EEID|111111113|SUSIE||JONES
STAT|111111113|Y|01/01/2021
STAT|111111113|N|06/15/2021
STAT|111111113|Y|08/01/2021
FOOT|3
```

---

## 13. Change Log

| Version | Date | Description |
|----------|------|------------|
| 8.0 | 04/01/2022 | Web-based version aligned to technical writing standards |