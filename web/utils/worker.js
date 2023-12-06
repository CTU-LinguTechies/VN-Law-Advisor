import { pipeline, env, T5Tokenizer, T5ForConditionalGeneration } from '@xenova/transformers';
// Skip local model check
env.allowLocalModels = false;

let lastInfered = null;

// Use the Singleton pattern to enable lazy construction of the pipeline.
class PipelineSingleton {
    static task = 'summarization';
    static modelName = 'xnohat/t5-vietnamese-summarization';
    static model = null;
    static tokenizer = null;

    static async getInstance(progress_callback = null) {
        if (this.model === null || this.tokenizer === null) {
            if (progress_callback) {
                progress_callback();
            }
            this.tokenizer = await T5Tokenizer.from_pretrained(this.modelName);
            this.model = await T5ForConditionalGeneration.from_pretrained(this.modelName);
        }
        return {
            model: this.model,
            tokenizer: this.tokenizer,
        };
    }
}

// Listen for messages from the main thread
self.addEventListener('message', async (event) => {
    const { model, tokenizer } = await PipelineSingleton.getInstance(() => {
        self.postMessage({
            status: 'init',
            output: 'Đang tải mô hình... (chỉ tải lần đầu tiên)',
        });
    });
    self.postMessage({
        status: 'progress',
        output: 'Mô hình đã có. Đang tạo tóm tắt...',
    });

    const { input_ids } = await tokenizer(event.data.text);
    const output = await model.generate(input_ids, {
        max_length: 256,
        num_beams: 5,
        repetition_penalty: 2.5,
        length_penalty: 1.0,
        early_stopping: true,
    });
    const output_text = tokenizer.decode(output[0], { skip_special_tokens: true });

    // Send the output back to the main thread
    self.postMessage({
        status: 'complete',
        output: output_text,
    });
});
