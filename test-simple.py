import urllib.request
import json

def test_api():
    try:
        # Test health endpoint
        print("Testing API health endpoint...")
        response = urllib.request.urlopen('http://localhost:3002/api/health')
        data = json.loads(response.read().decode())
        print(f"Status Code: {response.getcode()}")
        print(f"Response: {data}")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_api()





