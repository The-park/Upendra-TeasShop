// TeaShop Application JavaScript
import './bootstrap';
import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import $ from 'jquery';
// Capacitor Local Notifications for mobile app
import { LocalNotifications } from '@capacitor/local-notifications';
import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';

// Expose Bootstrap globally so inline/blade scripts can call bootstrap.Modal etc.
window.bootstrap = bootstrap;

// Expose jQuery globally so inline scripts and CDN-independent views can use it
window.$ = window.jQuery = $;

// Expose LocalNotifications globally for inline scripts
window.LocalNotifications = LocalNotifications;

// CSRF Token Setup for AJAX
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

// Toast Notification Function
window.showToast = function(type, message) {
    const toastId = 'toast-' + Date.now();
    const bgClass = type === 'success' ? 'bg-success' : 
                   type === 'error' ? 'bg-danger' : 
                   type === 'warning' ? 'bg-warning' : 'bg-info';
    
    const toastHtml = `
        <div id="${toastId}" class="toast ${bgClass} text-white" role="alert" data-bs-autohide="true" data-bs-delay="5000">
            <div class="toast-body d-flex align-items-center">
                <i class="bi bi-${type === 'success' ? 'check-circle' : 
                                  type === 'error' ? 'exclamation-circle' : 
                                  type === 'warning' ? 'exclamation-triangle' : 'info-circle'} me-2"></i>
                ${message}
                <button type="button" class="btn-close btn-close-white ms-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `;
    
    $('body').append(toastHtml);
    const toast = new bootstrap.Toast(document.getElementById(toastId));
    toast.show();
    
    // Remove from DOM after hide
    $('#' + toastId).on('hidden.bs.toast', function() {
        $(this).remove();
    });
};

// Mobile notification helper: prefers Capacitor LocalNotifications, falls back to Android bridge
window.notifyMobile = async function(title, message, id) {
    try {
        const notifTitle = title || 'TeaShop';
        const notifBody  = message || '';

        // Detect Capacitor LocalNotifications plugin (either via ESM import or global Capacitor.Plugins)
        let plugin = null;
        if (window.LocalNotifications && typeof window.LocalNotifications.requestPermissions === 'function') {
            plugin = window.LocalNotifications;
        } else if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.LocalNotifications) {
            plugin = window.Capacitor.Plugins.LocalNotifications;
        }

        if (plugin && typeof plugin.requestPermissions === 'function' && typeof plugin.schedule === 'function') {
            const perm = await plugin.requestPermissions();
            // On Android, perm may be { display: 'granted' } or just 'granted'
            const granted = (perm && (perm.display === 'granted' || perm === 'granted'));
            if (granted) {
                await plugin.schedule({
                    notifications: [
                        {
                            id: id || Date.now(),
                            title: notifTitle,
                            body: notifBody,
                        },
                    ],
                });
                return;
            }
        }

        // Fallback: Android WebView JS interface if running inside custom Android shell
        if (window.AndroidLocationNotifier && typeof window.AndroidLocationNotifier.showSimple === 'function') {
            window.AndroidLocationNotifier.showSimple(notifTitle, notifBody);
            return;
        }

        // Final fallback: browser Notification API (when testing in Chrome)
        if (typeof Notification !== 'undefined') {
            if (Notification.permission === 'granted') {
                new Notification(notifTitle, { body: notifBody, icon: '/favicon.ico' });
            } else if (Notification.permission === 'default') {
                Notification.requestPermission().then(p => {
                    if (p === 'granted') {
                        new Notification(notifTitle, { body: notifBody, icon: '/favicon.ico' });
                    }
                });
            }
        }
    } catch (e) {
        console.warn('notifyMobile failed', e);
    }
};

// Push Notifications (FCM) registration for native app
async function initPushNotifications() {
    try {
        if (!Capacitor.isNativePlatform || !Capacitor.isNativePlatform()) {
            return;
        }

        const platform = Capacitor.getPlatform ? Capacitor.getPlatform() : 'unknown';
        if (platform !== 'android') {
            return;
        }

        const perm = await PushNotifications.requestPermissions();
        if (perm.receive !== 'granted') {
            console.warn('Push notification permission not granted', perm);
            return;
        }

        await PushNotifications.register();

        PushNotifications.addListener('registration', async (token) => {
            try {
                // Stable device id stored locally
                let deviceId = localStorage.getItem('teashop_device_id');
                if (!deviceId) {
                    deviceId = 'device-' + Math.random().toString(36).substring(2) + Date.now().toString(36);
                    localStorage.setItem('teashop_device_id', deviceId);
                }

                await fetch('/api/push/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                        'X-Device-Id': deviceId,
                    },
                    body: JSON.stringify({
                        token: token.value,
                        platform,
                        device_id: deviceId,
                    }),
                });
            } catch (e) {
                console.warn('Failed to register push token', e);
            }
        });

        PushNotifications.addListener('registrationError', (err) => {
            console.error('Push registration error', err);
        });
    } catch (e) {
        console.warn('initPushNotifications failed', e);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPushNotifications);
} else {
    initPushNotifications();
}

// Loading Button Helper
window.setButtonLoading = function(button, loading = true) {
    const $btn = $(button);
    if (loading) {
        $btn.data('original-text', $btn.html());
        $btn.html('<span class="spinner-border spinner-border-sm me-2"></span>Loading...');
        $btn.prop('disabled', true);
    } else {
        $btn.html($btn.data('original-text'));
        $btn.prop('disabled', false);
    }
};

// Shopping Cart Functions
window.TeaShopCart = {
    // Add item to cart
    addItem: function(productId, productName, productPrice, quantity = 1) {
        setButtonLoading($(`.add-to-cart[data-id="${productId}"]`), true);
        
        $.ajax({
            url: '/cart/add',
            method: 'POST',
            data: {
                product_id: productId,
                quantity: quantity
            },
            success: function(response) {
                // Update cart count
                $('.cart-count').text(response.cart_count);
                
                // Show success message
                showToast('success', `${productName} added to cart!`);
                // Mobile OS notification (if running inside the app)
                window.notifyMobile('TeaShop', `${productName} added to your cart`);
                
                // Animate FAB
                $('#cartFab').addClass('bounce');
                setTimeout(() => $('#cartFab').removeClass('bounce'), 500);
            },
            error: function(xhr) {
                showToast('error', xhr.responseJSON?.message || 'Failed to add item to cart');
            },
            complete: function() {
                setButtonLoading($(`.add-to-cart[data-id="${productId}"]`), false);
            }
        });
    },
    
    // Update item quantity
    updateQuantity: function(productId, quantity) {
        $.ajax({
            url: '/cart/update',
            method: 'POST',
            data: {
                product_id: productId,
                quantity: quantity
            },
            success: function(response) {
                // Update cart display
                location.reload(); // Simple reload for now
            },
            error: function(xhr) {
                showToast('error', xhr.responseJSON?.message || 'Failed to update quantity');
            }
        });
    },
    
    // Remove item from cart
    removeItem: function(productId) {
        $.ajax({
            url: '/cart/remove',
            method: 'POST',
            data: {
                product_id: productId
            },
            success: function(response) {
                // Remove item from display
                $(`.cart-item[data-id="${productId}"]`).fadeOut(300, function() {
                    $(this).remove();
                });
                
                // Update cart count
                $('.cart-count').text(response.cart_count);
                
                showToast('success', 'Item removed from cart');
            },
            error: function(xhr) {
                showToast('error', xhr.responseJSON?.message || 'Failed to remove item');
            }
        });
    }
};

// Admin Functions
window.TeaShopAdmin = {
    // Delete confirmation
    confirmDelete: function(url, itemName) {
        if (confirm(`Are you sure you want to delete "${itemName}"? This action cannot be undone.`)) {
            $.ajax({
                url: url,
                method: 'DELETE',
                success: function(response) {
                    showToast('success', 'Item deleted successfully');
                    location.reload();
                },
                error: function(xhr) {
                    showToast('error', xhr.responseJSON?.message || 'Failed to delete item');
                }
            });
        }
    },
    
    // Update order status
    updateOrderStatus: function(orderId, status) {
        setButtonLoading($(`.status-btn[data-order="${orderId}"][data-status="${status}"]`), true);
        
        $.ajax({
            url: `/admin/orders/${orderId}/update-status`,
            method: 'POST',
            data: {
                status: status
            },
            success: function(response) {
                showToast('success', 'Order status updated');
                // Refresh the kitchen display
                if (typeof refreshKitchenDisplay === 'function') {
                    refreshKitchenDisplay();
                }
            },
            error: function(xhr) {
                showToast('error', xhr.responseJSON?.message || 'Failed to update status');
            },
            complete: function() {
                setButtonLoading($(`.status-btn[data-order="${orderId}"][data-status="${status}"]`), false);
            }
        });
    }
};

// Kitchen Display Auto-refresh
let kitchenRefreshInterval;

window.startKitchenAutoRefresh = function() {
    kitchenRefreshInterval = setInterval(refreshKitchenDisplay, 10000); // Every 10 seconds
};

window.stopKitchenAutoRefresh = function() {
    if (kitchenRefreshInterval) {
        clearInterval(kitchenRefreshInterval);
    }
};

window.refreshKitchenDisplay = function() {
    $.ajax({
        url: '/admin/orders/live-feed',
        method: 'GET',
        success: function(response) {
            // Update kanban board
            updateKanbanBoard(response.orders);
            
            // Play sound for new orders
            if (response.new_orders_count > 0) {
                playNotificationSound();
                showBrowserNotification(`${response.new_orders_count} new order(s)`);
            }
        },
        error: function() {
            console.log('Failed to refresh kitchen display');
        }
    });
};

function updateKanbanBoard(orders) {
    // This would update the visual order cards - implementation depends on HTML structure
    Object.keys(orders).forEach(status => {
        const $column = $(`.kanban-column[data-status="${status}"] .order-cards`);
        // Update column content with new orders
    });
}

function playNotificationSound() {
    // Simple beep sound for new orders
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+Dzu2YdBze+0/bIeSkGIni/7t2RQAQUXq/m56pXFAxFod/0xmUcBjm/0/bIeSoCH3i87tx8LwUyYrjq651NEQxRp+PwtmMcBjiR1/LNeSQF...');
    audio.play().catch(() => {}); // Ignore errors if audio fails
}

function showBrowserNotification(message) {
    // Request notification permission and show notification
    if ("Notification" in window && Notification.permission === "granted") {
        new Notification("TeaShop - New Order", {
            body: message,
            icon: '/favicon.ico'
        });
    }
}

// Image Upload Preview
window.setupImagePreview = function(inputId, previewId) {
    $(`#${inputId}`).on('change', function(e) {
        const file = e.target.files[0];
        const $preview = $(`#${previewId}`);
        
        if (file) {
            // Validation
            const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
            if (!allowedTypes.includes(file.type)) {
                showToast('error', 'Only JPG, PNG, and WebP formats are allowed');
                this.value = '';
                return;
            }
            
            if (file.size > 2 * 1024 * 1024) { // 2MB
                showToast('error', 'File size must not exceed 2MB');
                this.value = '';
                return;
            }
            
            // Show preview
            const reader = new FileReader();
            reader.onload = function(e) {
                $preview.find('img').attr('src', e.target.result);
                $preview.show();
            };
            reader.readAsDataURL(file);
        } else {
            $preview.hide();
        }
    });
    
    // Remove image button
    $(`#${previewId} .btn-remove-image`).on('click', function() {
        $(`#${inputId}`).val('');
        $(`#${previewId}`).hide();
    });
};

// Form Validation Enhancement
window.setupFormValidation = function() {
    $('form').on('submit', function(e) {
        const $form = $(this);
        const $submitBtn = $form.find('button[type="submit"]');
        
        // Basic client-side validation
        let isValid = true;
        $form.find('[required]').each(function() {
            if (!$(this).val()) {
                isValid = false;
                $(this).addClass('is-invalid');
            } else {
                $(this).removeClass('is-invalid');
            }
        });
        
        if (!isValid) {
            e.preventDefault();
            showToast('error', 'Please fill in all required fields');
            return;
        }
        
        setButtonLoading($submitBtn, true);
    });
};

// Initialize on document ready
$(document).ready(function() {
    // Setup form validation
    setupFormValidation();
    
    // Setup add to cart buttons
    $(document).on('click', '.add-to-cart', function(e) {
        e.preventDefault();
        const $btn = $(this);
        const productId = $btn.data('id');
        const productName = $btn.data('name');
        const productPrice = $btn.data('price');
        
        TeaShopCart.addItem(productId, productName, productPrice);
    });
    
    // Setup quantity change buttons
    $(document).on('click', '.qty-increase, .qty-decrease', function(e) {
        e.preventDefault();
        const $btn = $(this);
        const $input = $btn.siblings('.qty-input');
        const productId = $input.data('product-id');
        let quantity = parseInt($input.val());
        
        if ($btn.hasClass('qty-increase')) {
            quantity += 1;
        } else if (quantity > 1) {
            quantity -= 1;
        }
        
        $input.val(quantity);
        TeaShopCart.updateQuantity(productId, quantity);
    });
    
    // Setup remove from cart buttons
    $(document).on('click', '.remove-from-cart', function(e) {
        e.preventDefault();
        const productId = $(this).data('product-id');
        TeaShopCart.removeItem(productId);
    });
    
    // Setup delete confirmation buttons
    $(document).on('click', '.btn-delete', function(e) {
        e.preventDefault();
        const url = $(this).data('url') || $(this).attr('href');
        const itemName = $(this).data('item-name') || 'this item';
        TeaShopAdmin.confirmDelete(url, itemName);
    });
    
    // Setup order status update buttons
    $(document).on('click', '.status-btn', function(e) {
        e.preventDefault();
        const orderId = $(this).data('order');
        const status = $(this).data('status');
        TeaShopAdmin.updateOrderStatus(orderId, status);
    });
    
    // Request notification permission
    if ("Notification" in window && Notification.permission === "default") {
        Notification.requestPermission();
    }
    
    // Auto-start kitchen refresh if on kitchen display page
    if ($('.kanban-board').length > 0) {
        startKitchenAutoRefresh();
    }
});