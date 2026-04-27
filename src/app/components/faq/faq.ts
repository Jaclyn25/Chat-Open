import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface IFaqItem {
  id: string;
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.html',
  styleUrl: './faq.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FaqComponent {
  readonly questions: IFaqItem[] = [
    {
      id: 'q1',
      question: 'What happens to my corporate data after interacting with ChatOPni?',
      answer: 'We utilize a strict Zero-Retention architecture. Once the conversational session drops, all generated tokens and vectors are wiped cleanly from memory buffers. Your data never trains our underlying foundational models.'
    },
    {
      id: 'q2',
      question: 'Do you offer an on-premise containerized solution?',
      answer: 'Yes! Enterprise tiers have access to Docker artifacts pre-configured for Kubernetes ecosystems, ensuring our Neural Engine runs directly inside your private VPC.'
    },
    {
      id: 'q3',
      question: 'How fast is the latency compared to generic ChatGPT?',
      answer: 'Because of our .NET 8 WebSockets and SignalR bridging, the average latency is reduced to sub-30ms per token cluster stream, outperforming standard REST endpoints considerably.'
    },
    {
      id: 'q4',
      question: 'Which AI models power the Playground?',
      answer: 'We abstract various LLM models including high-tier parameter engines. Our internal routing mechanism automatically forwards your complex reasoning requests to the most capable engine seamlessly.'
    }
  ];

  readonly openItemId = signal<string | null>(null);

  toggleItem(id: string): void {
    this.openItemId.update(current => current === id ? null : id);
  }
}
