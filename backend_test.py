#!/usr/bin/env python3
"""
Backend API Testing Script for Contact Form Endpoints
Tests all Contact form endpoints plus regression tests for existing endpoints
"""

import requests
import json
from datetime import datetime

# Load backend URL from frontend/.env
def get_backend_url():
    with open('/app/frontend/.env', 'r') as f:
        for line in f:
            if line.startswith('REACT_APP_BACKEND_URL='):
                return line.split('=', 1)[1].strip()
    raise ValueError("REACT_APP_BACKEND_URL not found in /app/frontend/.env")

BASE_URL = get_backend_url()
ADMIN_TOKEN = "bhanu-inbox-2026"

# Test results tracking
test_results = {
    "passed": [],
    "failed": []
}

def log_test(test_name, passed, details=""):
    """Log test result"""
    if passed:
        test_results["passed"].append(test_name)
        print(f"✅ PASS: {test_name}")
        if details:
            print(f"   {details}")
    else:
        test_results["failed"].append(test_name)
        print(f"❌ FAIL: {test_name}")
        if details:
            print(f"   {details}")
    print()

def print_summary():
    """Print test summary"""
    print("\n" + "="*80)
    print("TEST SUMMARY")
    print("="*80)
    print(f"Total Tests: {len(test_results['passed']) + len(test_results['failed'])}")
    print(f"Passed: {len(test_results['passed'])}")
    print(f"Failed: {len(test_results['failed'])}")
    
    if test_results['failed']:
        print("\nFailed Tests:")
        for test in test_results['failed']:
            print(f"  - {test}")
    print("="*80)

# Store created message ID for later tests
created_message_id = None

def test_regression_root():
    """Test GET /api/ endpoint (regression)"""
    try:
        response = requests.get(f"{BASE_URL}/api/", timeout=10)
        if response.status_code == 200 and response.json().get("message") == "Hello World":
            log_test("Regression: GET /api/", True, f"Response: {response.json()}")
        else:
            log_test("Regression: GET /api/", False, f"Status: {response.status_code}, Body: {response.text}")
    except Exception as e:
        log_test("Regression: GET /api/", False, f"Exception: {str(e)}")

def test_regression_status():
    """Test POST and GET /api/status endpoints (regression)"""
    try:
        # Test POST /api/status
        payload = {"client_name": "test_client_contact_form"}
        response = requests.post(f"{BASE_URL}/api/status", json=payload, timeout=10)
        if response.status_code == 200:
            data = response.json()
            if "id" in data and data.get("client_name") == "test_client_contact_form":
                log_test("Regression: POST /api/status", True, f"Created status check with id: {data['id']}")
            else:
                log_test("Regression: POST /api/status", False, f"Missing fields in response: {data}")
        else:
            log_test("Regression: POST /api/status", False, f"Status: {response.status_code}, Body: {response.text}")
        
        # Test GET /api/status
        response = requests.get(f"{BASE_URL}/api/status", timeout=10)
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list):
                log_test("Regression: GET /api/status", True, f"Retrieved {len(data)} status checks")
            else:
                log_test("Regression: GET /api/status", False, f"Expected list, got: {type(data)}")
        else:
            log_test("Regression: GET /api/status", False, f"Status: {response.status_code}, Body: {response.text}")
    except Exception as e:
        log_test("Regression: POST/GET /api/status", False, f"Exception: {str(e)}")

def test_contact_create_happy_path():
    """Test POST /api/contact with valid payload (200)"""
    global created_message_id
    try:
        payload = {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "subject": "Test Subject",
            "message": "This is a test message for the contact form."
        }
        response = requests.post(f"{BASE_URL}/api/contact", json=payload, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            # Verify all required fields
            if all(k in data for k in ["id", "name", "email", "subject", "message", "read", "timestamp"]):
                if (data["name"] == payload["name"] and 
                    data["email"] == payload["email"] and
                    data["subject"] == payload["subject"] and
                    data["message"] == payload["message"] and
                    data["read"] == False):
                    created_message_id = data["id"]
                    log_test("POST /api/contact - Happy Path (200)", True, 
                            f"Created message with id: {created_message_id}")
                else:
                    log_test("POST /api/contact - Happy Path (200)", False, 
                            f"Field values don't match. Response: {data}")
            else:
                log_test("POST /api/contact - Happy Path (200)", False, 
                        f"Missing required fields. Response: {data}")
        else:
            log_test("POST /api/contact - Happy Path (200)", False, 
                    f"Status: {response.status_code}, Body: {response.text}")
    except Exception as e:
        log_test("POST /api/contact - Happy Path (200)", False, f"Exception: {str(e)}")

def test_contact_create_invalid_email():
    """Test POST /api/contact with invalid email (422)"""
    try:
        payload = {
            "name": "Jane Doe",
            "email": "invalid-email",
            "message": "Test message"
        }
        response = requests.post(f"{BASE_URL}/api/contact", json=payload, timeout=10)
        
        if response.status_code == 422:
            log_test("POST /api/contact - Invalid Email (422)", True, 
                    f"Correctly rejected invalid email")
        else:
            log_test("POST /api/contact - Invalid Email (422)", False, 
                    f"Expected 422, got {response.status_code}. Body: {response.text}")
    except Exception as e:
        log_test("POST /api/contact - Invalid Email (422)", False, f"Exception: {str(e)}")

def test_contact_create_missing_name():
    """Test POST /api/contact with missing name (422)"""
    try:
        payload = {
            "email": "test@example.com",
            "message": "Test message"
        }
        response = requests.post(f"{BASE_URL}/api/contact", json=payload, timeout=10)
        
        if response.status_code == 422:
            log_test("POST /api/contact - Missing Name (422)", True, 
                    f"Correctly rejected missing name")
        else:
            log_test("POST /api/contact - Missing Name (422)", False, 
                    f"Expected 422, got {response.status_code}. Body: {response.text}")
    except Exception as e:
        log_test("POST /api/contact - Missing Name (422)", False, f"Exception: {str(e)}")

def test_contact_create_empty_message():
    """Test POST /api/contact with empty message (422)"""
    try:
        payload = {
            "name": "Test User",
            "email": "test@example.com",
            "message": ""
        }
        response = requests.post(f"{BASE_URL}/api/contact", json=payload, timeout=10)
        
        if response.status_code == 422:
            log_test("POST /api/contact - Empty Message (422)", True, 
                    f"Correctly rejected empty message")
        else:
            log_test("POST /api/contact - Empty Message (422)", False, 
                    f"Expected 422, got {response.status_code}. Body: {response.text}")
    except Exception as e:
        log_test("POST /api/contact - Empty Message (422)", False, f"Exception: {str(e)}")

def test_contact_list_no_token():
    """Test GET /api/contact without admin token (401)"""
    try:
        response = requests.get(f"{BASE_URL}/api/contact", timeout=10)
        
        if response.status_code == 401:
            log_test("GET /api/contact - No Token (401)", True, 
                    f"Correctly rejected request without token")
        else:
            log_test("GET /api/contact - No Token (401)", False, 
                    f"Expected 401, got {response.status_code}. Body: {response.text}")
    except Exception as e:
        log_test("GET /api/contact - No Token (401)", False, f"Exception: {str(e)}")

def test_contact_list_wrong_token():
    """Test GET /api/contact with wrong admin token (401)"""
    try:
        headers = {"X-Admin-Token": "wrong-token"}
        response = requests.get(f"{BASE_URL}/api/contact", headers=headers, timeout=10)
        
        if response.status_code == 401:
            log_test("GET /api/contact - Wrong Token (401)", True, 
                    f"Correctly rejected request with wrong token")
        else:
            log_test("GET /api/contact - Wrong Token (401)", False, 
                    f"Expected 401, got {response.status_code}. Body: {response.text}")
    except Exception as e:
        log_test("GET /api/contact - Wrong Token (401)", False, f"Exception: {str(e)}")

def test_contact_list_correct_token():
    """Test GET /api/contact with correct admin token (200)"""
    global created_message_id
    try:
        headers = {"X-Admin-Token": ADMIN_TOKEN}
        response = requests.get(f"{BASE_URL}/api/contact", headers=headers, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list):
                # Check if our created message is in the list
                found = False
                if created_message_id:
                    for msg in data:
                        if msg.get("id") == created_message_id:
                            found = True
                            break
                    if found:
                        log_test("GET /api/contact - Correct Token (200)", True, 
                                f"Retrieved {len(data)} messages, found our test message")
                    else:
                        log_test("GET /api/contact - Correct Token (200)", False, 
                                f"Retrieved {len(data)} messages, but test message not found")
                else:
                    log_test("GET /api/contact - Correct Token (200)", True, 
                            f"Retrieved {len(data)} messages (no test message to verify)")
            else:
                log_test("GET /api/contact - Correct Token (200)", False, 
                        f"Expected list, got: {type(data)}")
        else:
            log_test("GET /api/contact - Correct Token (200)", False, 
                    f"Expected 200, got {response.status_code}. Body: {response.text}")
    except Exception as e:
        log_test("GET /api/contact - Correct Token (200)", False, f"Exception: {str(e)}")

def test_contact_mark_read_no_token():
    """Test PATCH /api/contact/{id}/read without admin token (401)"""
    global created_message_id
    if not created_message_id:
        log_test("PATCH /api/contact/{id}/read - No Token (401)", False, 
                "Skipped: No message ID available")
        return
    
    try:
        response = requests.patch(f"{BASE_URL}/api/contact/{created_message_id}/read", timeout=10)
        
        if response.status_code == 401:
            log_test("PATCH /api/contact/{id}/read - No Token (401)", True, 
                    f"Correctly rejected request without token")
        else:
            log_test("PATCH /api/contact/{id}/read - No Token (401)", False, 
                    f"Expected 401, got {response.status_code}. Body: {response.text}")
    except Exception as e:
        log_test("PATCH /api/contact/{id}/read - No Token (401)", False, f"Exception: {str(e)}")

def test_contact_mark_read_with_token():
    """Test PATCH /api/contact/{id}/read with admin token (200)"""
    global created_message_id
    if not created_message_id:
        log_test("PATCH /api/contact/{id}/read - With Token (200)", False, 
                "Skipped: No message ID available")
        return
    
    try:
        headers = {"X-Admin-Token": ADMIN_TOKEN}
        response = requests.patch(f"{BASE_URL}/api/contact/{created_message_id}/read", 
                                 headers=headers, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if data.get("ok") == True:
                log_test("PATCH /api/contact/{id}/read - With Token (200)", True, 
                        f"Successfully marked message as read")
            else:
                log_test("PATCH /api/contact/{id}/read - With Token (200)", False, 
                        f"Unexpected response: {data}")
        else:
            log_test("PATCH /api/contact/{id}/read - With Token (200)", False, 
                    f"Expected 200, got {response.status_code}. Body: {response.text}")
    except Exception as e:
        log_test("PATCH /api/contact/{id}/read - With Token (200)", False, f"Exception: {str(e)}")

def test_contact_mark_read_invalid_id():
    """Test PATCH /api/contact/{id}/read with invalid ID (404)"""
    try:
        headers = {"X-Admin-Token": ADMIN_TOKEN}
        bogus_id = "00000000-0000-0000-0000-000000000000"
        response = requests.patch(f"{BASE_URL}/api/contact/{bogus_id}/read", 
                                 headers=headers, timeout=10)
        
        if response.status_code == 404:
            log_test("PATCH /api/contact/{id}/read - Invalid ID (404)", True, 
                    f"Correctly returned 404 for invalid ID")
        else:
            log_test("PATCH /api/contact/{id}/read - Invalid ID (404)", False, 
                    f"Expected 404, got {response.status_code}. Body: {response.text}")
    except Exception as e:
        log_test("PATCH /api/contact/{id}/read - Invalid ID (404)", False, f"Exception: {str(e)}")

def test_contact_delete_no_token():
    """Test DELETE /api/contact/{id} without admin token (401)"""
    global created_message_id
    if not created_message_id:
        log_test("DELETE /api/contact/{id} - No Token (401)", False, 
                "Skipped: No message ID available")
        return
    
    try:
        response = requests.delete(f"{BASE_URL}/api/contact/{created_message_id}", timeout=10)
        
        if response.status_code == 401:
            log_test("DELETE /api/contact/{id} - No Token (401)", True, 
                    f"Correctly rejected request without token")
        else:
            log_test("DELETE /api/contact/{id} - No Token (401)", False, 
                    f"Expected 401, got {response.status_code}. Body: {response.text}")
    except Exception as e:
        log_test("DELETE /api/contact/{id} - No Token (401)", False, f"Exception: {str(e)}")

def test_contact_delete_with_token():
    """Test DELETE /api/contact/{id} with admin token (200)"""
    global created_message_id
    if not created_message_id:
        log_test("DELETE /api/contact/{id} - With Token (200)", False, 
                "Skipped: No message ID available")
        return
    
    try:
        headers = {"X-Admin-Token": ADMIN_TOKEN}
        response = requests.delete(f"{BASE_URL}/api/contact/{created_message_id}", 
                                  headers=headers, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if data.get("ok") == True:
                log_test("DELETE /api/contact/{id} - With Token (200)", True, 
                        f"Successfully deleted message")
            else:
                log_test("DELETE /api/contact/{id} - With Token (200)", False, 
                        f"Unexpected response: {data}")
        else:
            log_test("DELETE /api/contact/{id} - With Token (200)", False, 
                    f"Expected 200, got {response.status_code}. Body: {response.text}")
    except Exception as e:
        log_test("DELETE /api/contact/{id} - With Token (200)", False, f"Exception: {str(e)}")

def test_contact_delete_invalid_id():
    """Test DELETE /api/contact/{id} with invalid ID (404)"""
    try:
        headers = {"X-Admin-Token": ADMIN_TOKEN}
        bogus_id = "99999999-9999-9999-9999-999999999999"
        response = requests.delete(f"{BASE_URL}/api/contact/{bogus_id}", 
                                  headers=headers, timeout=10)
        
        if response.status_code == 404:
            log_test("DELETE /api/contact/{id} - Invalid ID (404)", True, 
                    f"Correctly returned 404 for invalid ID")
        else:
            log_test("DELETE /api/contact/{id} - Invalid ID (404)", False, 
                    f"Expected 404, got {response.status_code}. Body: {response.text}")
    except Exception as e:
        log_test("DELETE /api/contact/{id} - Invalid ID (404)", False, f"Exception: {str(e)}")


if __name__ == "__main__":
    print("="*80)
    print("BACKEND API TESTING - Contact Form Endpoints")
    print("="*80)
    print(f"Base URL: {BASE_URL}")
    print(f"Admin Token: {ADMIN_TOKEN}")
    print("="*80)
    print()
    
    # Run regression tests first
    print("--- REGRESSION TESTS ---")
    test_regression_root()
    test_regression_status()
    
    # Run Contact form tests
    print("\n--- CONTACT FORM TESTS ---")
    
    # POST /api/contact tests
    print("\n[POST /api/contact Tests]")
    test_contact_create_happy_path()
    test_contact_create_invalid_email()
    test_contact_create_missing_name()
    test_contact_create_empty_message()
    
    # GET /api/contact tests
    print("\n[GET /api/contact Tests]")
    test_contact_list_no_token()
    test_contact_list_wrong_token()
    test_contact_list_correct_token()
    
    # PATCH /api/contact/{id}/read tests
    print("\n[PATCH /api/contact/{id}/read Tests]")
    test_contact_mark_read_no_token()
    test_contact_mark_read_with_token()
    test_contact_mark_read_invalid_id()
    
    # DELETE /api/contact/{id} tests
    print("\n[DELETE /api/contact/{id} Tests]")
    test_contact_delete_no_token()
    test_contact_delete_with_token()
    test_contact_delete_invalid_id()
    
    # Print summary
    print_summary()
