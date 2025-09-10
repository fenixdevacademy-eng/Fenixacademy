import { NextRequest, NextResponse } from 'next/server';
import { createNextApiHandler } from '@/lib/error-handler';

async function handler(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const errorType = searchParams.get('type');

    // Test different error types
    switch (errorType) {
        case 'timeout':
            // Simulate timeout
            await new Promise(resolve => setTimeout(resolve, 30000));
            return NextResponse.json({ success: true });

        case 'payload-too-large':
            // Simulate large payload
            const largeData = new Array(1000000).fill('x').join('');
            return NextResponse.json({ data: largeData });

        case 'function-failure':
            return NextResponse.json(
                { success: false, error: 'FUNCTION_INVOCATION_FAILED' },
                { status: 500 }
            );

        case 'body-not-string':
            return NextResponse.json(
                { success: false, error: 'BODY_NOT_A_STRING' },
                { status: 502 }
            );

        case 'dns-error':
            return NextResponse.json(
                { success: false, error: 'DNS_HOSTNAME_NOT_FOUND' },
                { status: 502 }
            );

        case 'router-error':
            return NextResponse.json(
                { success: false, error: 'ROUTER_CANNOT_MATCH' },
                { status: 502 }
            );

        case 'deployment-error':
            return NextResponse.json(
                { success: false, error: 'DEPLOYMENT_BLOCKED' },
                { status: 403 }
            );

        case 'request-error':
            return NextResponse.json(
                { success: false, error: 'MALFORMED_REQUEST_HEADER' },
                { status: 400 }
            );

        case 'range-error':
            return NextResponse.json(
                { error: 'RANGE_START_NOT_VALID' },
                { status: 416 }
            );

        case 'throttled':
            return NextResponse.json(
                { error: 'FUNCTION_THROTTLED' },
                { status: 503 }
            );

        case 'not-found':
            return NextResponse.json(
                { error: 'RESOURCE_NOT_FOUND' },
                { status: 404 }
            );

        case 'method-not-allowed':
            return NextResponse.json(
                { error: 'INVALID_REQUEST_METHOD' },
                { status: 405 }
            );

        case 'url-too-long':
            return NextResponse.json(
                { error: 'URL_TOO_LONG' },
                { status: 414 }
            );

        case 'header-too-large':
            return NextResponse.json(
                { error: 'REQUEST_HEADER_TOO_LARGE' },
                { status: 431 }
            );

        case 'infinite-loop':
            // This would cause an infinite loop in a real scenario
            return NextResponse.json(
                { error: 'INFINITE_LOOP_DETECTED' },
                { status: 508 }
            );

        case 'middleware-error':
            return NextResponse.json(
                { success: false, error: 'MIDDLEWARE_INVOCATION_FAILED' },
                { status: 500 }
            );

        case 'edge-function-error':
            return NextResponse.json(
                { success: false, error: 'EDGE_FUNCTION_INVOCATION_FAILED' },
                { status: 500 }
            );

        case 'image-optimize-error':
            return NextResponse.json(
                { error: 'INVALID_IMAGE_OPTIMIZE_REQUEST' },
                { status: 400 }
            );

        case 'external-image-error':
            return NextResponse.json(
                { error: 'OPTIMIZED_EXTERNAL_IMAGE_REQUEST_FAILED' },
                { status: 502 }
            );

        case 'sandbox-error':
            return NextResponse.json(
                { error: 'SANDBOX_NOT_FOUND' },
                { status: 404 }
            );

        case 'filesystem-error':
            return NextResponse.json(
                { error: 'TOO_MANY_FILESYSTEM_CHECKS' },
                { status: 502 }
            );

        case 'fork-error':
            return NextResponse.json(
                { error: 'TOO_MANY_FORKS' },
                { status: 502 }
            );

        case 'range-group-error':
            return NextResponse.json(
                { error: 'RANGE_GROUP_NOT_VALID' },
                { status: 416 }
            );

        case 'range-missing-unit':
            return NextResponse.json(
                { error: 'RANGE_MISSING_UNIT' },
                { status: 416 }
            );

        case 'range-end-error':
            return NextResponse.json(
                { error: 'RANGE_END_NOT_VALID' },
                { status: 416 }
            );

        case 'range-unit-error':
            return NextResponse.json(
                { error: 'RANGE_UNIT_NOT_SUPPORTED' },
                { status: 416 }
            );

        case 'too-many-ranges':
            return NextResponse.json(
                { error: 'TOO_MANY_RANGES' },
                { status: 416 }
            );

        case 'fallback-body-large':
            return NextResponse.json(
                { error: 'FALLBACK_BODY_TOO_LARGE' },
                { status: 502 }
            );

        case 'response-payload-large':
            return NextResponse.json(
                { error: 'FUNCTION_RESPONSE_PAYLOAD_TOO_LARGE' },
                { status: 500 }
            );

        case 'no-response':
            return NextResponse.json(
                { error: 'NO_RESPONSE_FROM_FUNCTION' },
                { status: 502 }
            );

        case 'middleware-timeout':
            return NextResponse.json(
                { error: 'MIDDLEWARE_INVOCATION_TIMEOUT' },
                { status: 504 }
            );

        case 'edge-timeout':
            return NextResponse.json(
                { error: 'EDGE_FUNCTION_INVOCATION_TIMEOUT' },
                { status: 504 }
            );

        case 'middleware-deprecated':
            return NextResponse.json(
                { error: 'MIDDLEWARE_RUNTIME_DEPRECATED' },
                { status: 503 }
            );

        case 'microfrontend-error':
            return NextResponse.json(
                { error: 'MICROFRONTENDS_MIDDLEWARE_ERROR' },
                { status: 500 }
            );

        case 'deployment-deleted':
            return NextResponse.json(
                { error: 'DEPLOYMENT_DELETED' },
                { status: 410 }
            );

        case 'deployment-disabled':
            return NextResponse.json(
                { error: 'DEPLOYMENT_DISABLED' },
                { status: 402 }
            );

        case 'deployment-not-found':
            return NextResponse.json(
                { error: 'DEPLOYMENT_NOT_FOUND' },
                { status: 404 }
            );

        case 'deployment-not-ready':
            return NextResponse.json(
                { error: 'DEPLOYMENT_NOT_READY_REDIRECTING' },
                { status: 303 }
            );

        case 'deployment-paused':
            return NextResponse.json(
                { error: 'DEPLOYMENT_PAUSED' },
                { status: 503 }
            );

        case 'sandbox-stopped':
            return NextResponse.json(
                { error: 'SANDBOX_STOPPED' },
                { status: 410 }
            );

        case 'sandbox-not-listening':
            return NextResponse.json(
                { error: 'SANDBOX_NOT_LISTENING' },
                { status: 502 }
            );

        case 'dns-empty':
            return NextResponse.json(
                { error: 'DNS_HOSTNAME_EMPTY' },
                { status: 502 }
            );

        case 'dns-resolve-failed':
            return NextResponse.json(
                { error: 'DNS_HOSTNAME_RESOLVE_FAILED' },
                { status: 502 }
            );

        case 'dns-private':
            return NextResponse.json(
                { error: 'DNS_HOSTNAME_RESOLVED_PRIVATE' },
                { status: 404 }
            );

        case 'dns-server-error':
            return NextResponse.json(
                { error: 'DNS_HOSTNAME_SERVER_ERROR' },
                { status: 502 }
            );

        case 'router-external-connection':
            return NextResponse.json(
                { error: 'ROUTER_EXTERNAL_TARGET_CONNECTION_ERROR' },
                { status: 502 }
            );

        case 'router-external-error':
            return NextResponse.json(
                { error: 'ROUTER_EXTERNAL_TARGET_ERROR' },
                { status: 502 }
            );

        case 'router-handshake-error':
            return NextResponse.json(
                { error: 'ROUTER_EXTERNAL_TARGET_HANDSHAKE_ERROR' },
                { status: 502 }
            );

        case 'router-too-many-selections':
            return NextResponse.json(
                { error: 'ROUTER_TOO_MANY_HAS_SELECTIONS' },
                { status: 502 }
            );

        default:
            return NextResponse.json({
                success: true,
                message: 'Error testing endpoint',
                availableErrors: [
                    'timeout', 'payload-too-large', 'function-failure', 'body-not-string',
                    'dns-error', 'router-error', 'deployment-error', 'request-error',
                    'range-error', 'throttled', 'not-found', 'method-not-allowed',
                    'url-too-long', 'header-too-large', 'infinite-loop', 'middleware-error',
                    'edge-function-error', 'image-optimize-error', 'external-image-error',
                    'sandbox-error', 'filesystem-error', 'fork-error', 'range-group-error',
                    'range-missing-unit', 'range-end-error', 'range-unit-error', 'too-many-ranges',
                    'fallback-body-large', 'response-payload-large', 'no-response',
                    'middleware-timeout', 'edge-timeout', 'middleware-deprecated',
                    'microfrontend-error', 'deployment-deleted', 'deployment-disabled',
                    'deployment-not-found', 'deployment-not-ready', 'deployment-paused',
                    'sandbox-stopped', 'sandbox-not-listening', 'dns-empty',
                    'dns-resolve-failed', 'dns-private', 'dns-server-error',
                    'router-external-connection', 'router-external-error', 'router-handshake-error',
                    'router-too-many-selections'
                ],
                usage: 'Add ?type=<error-type> to test specific errors'
            });
    }
}

export const GET = createNextApiHandler(handler);

