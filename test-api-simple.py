import requests

def test_api():
    try:
        # Test root endpoint
        print("Testing root endpoint...")
        response = requests.get('http://localhost:3002/')
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text[:200]}")
        
        # Test docs endpoint
        print("\nTesting docs endpoint...")
        response = requests.get('http://localhost:3002/docs')
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text[:200]}")
        
        # Test health endpoint
        print("\nTesting health endpoint...")
        response = requests.get('http://localhost:3002/api/health')
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text[:200]}")
        
    except requests.exceptions.ConnectionError:
        print("❌ Error: Could not connect to API server.")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    test_api()
