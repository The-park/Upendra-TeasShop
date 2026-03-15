package com.byteperday.teashop;

import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Step 1: Allow edge-to-edge drawing so we can control insets manually
        WindowCompat.setDecorFitsSystemWindows(getWindow(), false);

        // Step 2: Set status bar + nav bar colors
        getWindow().setStatusBarColor(Color.parseColor("#1e3d2f"));
        getWindow().setNavigationBarColor(Color.WHITE);

        // Step 3: Dynamically detect exact status bar / nav bar height per device
        // and apply that as padding to the root content view
        View rootView = findViewById(android.R.id.content);
        ViewCompat.setOnApplyWindowInsetsListener(rootView, (view, windowInsets) -> {
            Insets insets = windowInsets.getInsets(
                WindowInsetsCompat.Type.systemBars()
            );
            // Apply padding so WebView content never goes behind system bars
            view.setPadding(
                insets.left,   // left (handles RTL / edge cutouts)
                insets.top,    // top  = status bar height (dynamic per device)
                insets.right,  // right
                insets.bottom  // bottom = nav bar height (dynamic per device)
            );
            return WindowInsetsCompat.CONSUMED;
        });
    }
}
