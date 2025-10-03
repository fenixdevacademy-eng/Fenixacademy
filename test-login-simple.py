import urllib.request
import json

def test_login():
    try:
        # Test login endpoint
        print("Testing login endpoint...")
        
        login_data = {
            "email": "admin@fenix.com",
            "password": "admin123"
        }
        
        data = json.dumps(login_data).encode('utf-8')
        req = urllib.request.Request(
            'http://localhost:3002/api/auth/login',
            data=data,
            headers={'Content-Type': 'application/json'}
        )
        
        response = urllib.request.urlopen(req)
        result = json.loads(response.read().decode())
        
        print(f"Status Code: {response.getcode()}")
        print(f"Response: {result}")
        
        if result.get('success'):
            print("✅ Login successful!")
            print(f"User: {result.get('user', {}).get('name')}")
            print(f"Token: {result.get('token', '')[:50]}...")
        else:
            print("❌ Login failed!")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_login()





