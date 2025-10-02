import requests
import json

def test_api():
    try:
        # Test health endpoint
        print("Testing API health endpoint...")
        response = requests.get('http://localhost:3002/api/health')
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        # Test login endpoint
        print("\nTesting login endpoint...")
        login_data = {
            "email": "admin@fenix.com",
            "password": "admin123"
        }
        response = requests.post('http://localhost:3002/api/auth/login', json=login_data)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
    except requests.exceptions.ConnectionError:
        print("❌ Error: Could not connect to API server. Make sure it's running on port 3001.")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    test_api()
