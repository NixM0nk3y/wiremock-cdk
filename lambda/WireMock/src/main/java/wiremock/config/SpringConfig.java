package wiremock.config;

import com.github.tomakehurst.wiremock.WireMockServer;
import com.github.tomakehurst.wiremock.common.ConsoleNotifier;
import com.github.tomakehurst.wiremock.core.WireMockConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class SpringConfig {

    @Bean
    public WireMockServer getWireMockServer() {
        WireMockConfiguration options = new WireMockConfiguration()
                .usingFilesUnderDirectory("/var/task/wiremock")
                .port(9090)
                .notifier(new ConsoleNotifier(true));
        return new WireMockServer(options);
    }

    @Bean
    public RestTemplate getRestTemplate() {
        return new RestTemplate();
    }

}
